
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          toast({
            title: "Login Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success",
            description: "Logged in successfully!",
          });
          navigate("/");
        }
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });
        
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Account exists",
              description: "This email is already registered. Please try logging in instead.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Signup Error",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Success",
            description: "Account created successfully! Please check your email for verification.",
          });
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-pink-300 to-coral-400 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left side - Illustration */}
          <div className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 flex items-center justify-center p-8">
            {/* Decorative elements */}
            <div className="absolute top-8 left-8 w-12 h-12 bg-coral-400 rounded-full opacity-20"></div>
            <div className="absolute bottom-16 right-12 w-8 h-8 bg-blue-400 rounded-full opacity-30"></div>
            <div className="absolute top-1/3 right-8 w-6 h-6 bg-pink-300 rounded-full opacity-25"></div>
            
            {/* Main illustration area */}
            <div className="relative z-10 text-center">
              <img 
                src="/lovable-uploads/3ed7bcd1-d93a-4818-adb1-7a7aa8d5a20f.png" 
                alt="Welcome illustration" 
                className="w-80 h-80 object-contain mx-auto mb-6"
              />
              <h2 className="text-white text-2xl font-bold mb-2">Welcome to InterviewPrepHub</h2>
              <p className="text-slate-300 text-lg">Master your next technical interview</p>
            </div>
            
            {/* Abstract wave patterns */}
            <div className="absolute inset-0 opacity-10">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M20,60 Q40,40 60,60 T100,60 L100,100 L0,100 Z" fill="currentColor" className="text-coral-400"/>
              </svg>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-slate-800 flex items-center justify-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {isLogin ? "SIGN IN" : "SIGN UP"}
                </h1>
                <p className="text-slate-400">
                  {isLogin ? "Welcome back! Please sign in to continue" : "Create your account to get started"}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white text-sm font-medium">NAME</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-coral-400"
                      required={!isLogin}
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white text-sm font-medium">E-MAIL</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-coral-400"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white text-sm font-medium">PASSWORD</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-coral-400"
                    required
                    minLength={6}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-coral-400 hover:bg-coral-500 text-white font-medium py-3 rounded-lg transition-colors"
                  disabled={loading}
                >
                  {loading ? "Loading..." : isLogin ? "SIGN IN" : "SIGN UP"}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setEmail("");
                    setPassword("");
                    setName("");
                  }}
                  className="text-coral-400 hover:text-coral-300 text-sm transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
