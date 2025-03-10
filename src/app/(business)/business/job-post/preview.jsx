"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"

export function JobPreview({ 
  title = "", 
  description = "", 
  skills = [], 
  budget = { amount: "", type: "fixed" }, 
  deadline 
}) {
  const skillsMap = {
    javascript: "JavaScript",
    react: "React",
    nodejs: "Node.js",
    python: "Python",
    django: "Django",
    rails: "Ruby on Rails",
    php: "PHP",
    laravel: "Laravel",
    uiux: "UI/UX Design",
    "graphic-design": "Graphic Design",
    "content-writing": "Content Writing",
    seo: "SEO",
    "digital-marketing": "Digital Marketing",
    "mobile-dev": "Mobile Development",
    devops: "DevOps",
  }

  // Ensure budget is an object with default values
  const budgetData = budget || { amount: "", type: "fixed" };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title || "Job Title"}</CardTitle>
            <CardDescription>
              Posted by Your Company • {new Date().toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="font-medium">
              ${budgetData.amount || "0"} 
              <span className="text-muted-foreground text-sm">
                {budgetData.type === "hourly" ? "/hr" : " fixed"}
              </span>
            </div>
            {deadline && (
              <div className="text-sm text-muted-foreground">
                Due {format(deadline, "MMM d, yyyy")}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {description || "No description provided."}
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skillsMap[skill] || skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No skills specified</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
