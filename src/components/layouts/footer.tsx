import { Briefcase } from 'lucide-react'
import { Link } from 'react-router'

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Briefcase className="h-6 w-6 text-primary" />
              <span>JobExplo</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover your next opportunity with AI-powered job search.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Browse Jobs</Link></li>
              <li><Link to="/salary" className="text-sm text-muted-foreground hover:text-primary transition-colors">Salary Insights</Link></li>
              <li><Link to="/companies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Companies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Career Advice</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Resume Builder</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Interview Prep</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JobExplo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
