import { Link } from "react-router-dom";
import { Zap, Target, Trophy, Flame } from "lucide-react";
import { Navbar, Button, GrindCard, StatDisplay } from "../../components/ui";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar
        items={[
          { label: "Login", path: "/login" },
          { label: "Sign Up", path: "/register" },
        ]}
      />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-primary mb-6">
            PERFORMANCE TRACKER
            <br />
            FOR THE MIND
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Track your cognitive endurance and focus on your study goals.
            <br />
            Every session is proof of work.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/register">
              <Button className="text-gray-900">Start Grinding</Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
          </div>
        </div>

        {/* Example Grind Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest text-center mb-4">
            The "Focus" Moment
          </p>
          <GrindCard
            title="ADVANCED CALCULUS"
            subtitle="Deep Work Session"
            duration="02:45:00"
            sets={5}
            notes="Focused on integration by parts. 30 pages read."
            verified
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-center mb-12">
          Built for Discipline
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="card bg-neutral border border-white/5">
            <div className="card-body items-center text-center">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="card-title text-xl font-black italic mb-2">
                Session Tracking
              </h3>
              <p className="text-gray-400">
                Monitor your deep work sessions with precision timing and focus
                metrics.
              </p>
            </div>
          </div>
          <div className="card bg-neutral border border-white/5">
            <div className="card-body items-center text-center">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h3 className="card-title text-xl font-black italic mb-2">
                Goal Setting
              </h3>
              <p className="text-gray-400">
                Set cognitive performance goals and track your progress over
                time.
              </p>
            </div>
          </div>
          <div className="card bg-neutral border border-white/5">
            <div className="card-body items-center text-center">
              <Trophy className="w-12 h-12 text-primary mb-4" />
              <h3 className="card-title text-xl font-black italic mb-2">
                Achievements
              </h3>
              <p className="text-gray-400">
                Unlock badges and milestones as you build your cognitive
                endurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Preview */}
      <section className="container mx-auto px-4 py-16 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-center mb-12">
          Data-Dense Analytics
        </h2>
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="card bg-neutral border border-white/5">
            <div className="card-body">
              <StatDisplay
                title="Total Sessions"
                value="1,247"
                description="+127 this month"
                highlight
              />
            </div>
          </div>
          <div className="card bg-neutral border border-white/5">
            <div className="card-body">
              <StatDisplay
                title="Hours Logged"
                value="3,421"
                description="Avg 2.7h/session"
              />
            </div>
          </div>
          <div className="card bg-neutral border border-white/5">
            <div className="card-body">
              <StatDisplay
                title="Current Streak"
                value="42"
                description="days in a row"
                highlight
              />
            </div>
          </div>
          <div className="card bg-neutral border border-white/5">
            <div className="card-body">
              <StatDisplay
                title="Focus Score"
                value="94%"
                description="Personal best"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Flame className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-6">
            Ready to Grind?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join athletes of the mind tracking their cognitive performance.
          </p>
          <Link to="/register">
            <Button className="text-gray-900">Get Started Now</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 GrindSet. Performance tracking for the mind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
