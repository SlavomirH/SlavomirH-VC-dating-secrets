import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, TrendingUp, Calendar, Mail, Building, User, BookOpen, Download } from "lucide-react";
import { Link } from "react-router-dom";

interface Preorder {
  id: string;
  email: string;
  interested_chapters: string[] | null;
  marketing_consent: boolean;
  created_at: string;
}

interface Stats {
  total_preorders: number;
  daily_signups: number;
  weekly_signups: number;
}

export default function Admin() {
  const [preorders, setPreorders] = useState<Preorder[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      // Check if user is admin
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!adminData) {
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      setIsAuthorized(true);
      await loadData();
    } catch (error) {
      console.error('Error checking authorization:', error);
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = async () => {
    try {
      // Fetch preorders
      const { data: preorderData, error: preorderError } = await supabase
        .from('book_preorders')
        .select('*')
        .order('created_at', { ascending: false });

      if (preorderError) throw preorderError;
      setPreorders(preorderData || []);

      // Fetch stats
      const { data: statsData, error: statsError } = await supabase
        .rpc('get_preorder_stats');

      if (statsError) throw statsError;
      if (statsData && typeof statsData === 'object' && !Array.isArray(statsData)) {
        setStats(statsData as unknown as Stats);
      }

    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading data",
        description: "Please try refreshing the page.",
        variant: "destructive"
      });
    }
  };

  const exportToCsv = () => {
    const headers = ['Email', 'Interested Chapters', 'Marketing Consent', 'Signup Date'];
    const csvContent = [
      headers.join(','),
      ...preorders.map(p => [
        p.email,
        (p.interested_chapters || []).join('; '),
        p.marketing_consent ? 'Yes' : 'No',
        new Date(p.created_at).toLocaleDateString()
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `book-preorders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-passion"></div>
          <p className="mt-4 text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-destructive">Access Denied</CardTitle>
            <CardDescription>
              You need admin privileges to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-[var(--gradient-passion)] bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Book preorder analytics and management
            </p>
          </div>
          
          <div className="flex gap-4">
            <Button variant="outline" onClick={exportToCsv}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Link to="/">
              <Button variant="outline">View Landing Page</Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Preorders</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-passion">{stats.total_preorders}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Signups</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-confident">{stats.daily_signups}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-romantic">{stats.weekly_signups}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Preorders Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Book Preorders
            </CardTitle>
            <CardDescription>
              All user signups for the book preorder list
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Interested Chapters</TableHead>
                    <TableHead>Marketing</TableHead>
                    <TableHead>Signup Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preorders.map((preorder) => (
                    <TableRow key={preorder.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {preorder.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {preorder.interested_chapters && preorder.interested_chapters.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {preorder.interested_chapters.slice(0, 2).map((chapter, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {chapter.length > 15 ? chapter.substring(0, 15) + '...' : chapter}
                                </Badge>
                              ))}
                              {preorder.interested_chapters.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{preorder.interested_chapters.length - 2} more
                                </Badge>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">None selected</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={preorder.marketing_consent ? "default" : "secondary"}>
                          {preorder.marketing_consent ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(preorder.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {preorders.length === 0 && (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No preorders yet. Share the landing page to get started!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}