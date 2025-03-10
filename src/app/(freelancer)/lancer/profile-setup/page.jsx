"use client"

import { useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
// import { toast } from "@/hooks/use-toast"

const skillsList = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "C#",
  "PHP",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "UI/UX Design",
  "Product Management",
  "Data Analysis",
  "Machine Learning",
]

export default function ProfileSetupPage() {
  // Form state
  const [fullName, setFullName] = useState("")
  const [title, setTitle] = useState("")
  const [bio, setBio] = useState("")
  const [selectedSkills, setSelectedSkills] = useState([])
  const [openSkillsPopover, setOpenSkillsPopover] = useState(false)

  // Experiences state
  const [experiences, setExperiences] = useState([
    {
      title: "",
      company: "",
      startDate: new Date(),
      endDate: null,
      current: false,
      description: "",
    },
  ])

  // Portfolio links state
  const [portfolioLinks, setPortfolioLinks] = useState([{ title: "", url: "" }])

  // Certificates state
  const [certificates, setCertificates] = useState([
    {
      name: "",
      issuer: "",
      issueDate: new Date(),
      expiryDate: null,
      credentialId: "",
      image: null,
      imagePreview: null,
    },
  ])

  // Location state
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")

  function onSubmit(e) {
    e.preventDefault()

    const formData = {
      fullName,
      title,
      bio,
      skills: selectedSkills,
      experiences,
      portfolioLinks,
      certificates,
      location: { city, country },
    }

    console.log(formData)
    // toast({
    //   title: "Profile updated",
    //   description: "Your profile has been successfully updated.",
    // })
  }

  // Experience handlers
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "",
        company: "",
        startDate: new Date(),
        endDate: null,
        current: false,
        description: "",
      },
    ])
  }

  const updateExperience = (index, field, value) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index][field] = value
    setExperiences(updatedExperiences)
  }

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  // Portfolio link handlers
  const addPortfolioLink = () => {
    setPortfolioLinks([...portfolioLinks, { title: "", url: "" }])
  }

  const updatePortfolioLink = (index, field, value) => {
    const updatedLinks = [...portfolioLinks]
    updatedLinks[index][field] = value
    setPortfolioLinks(updatedLinks)
  }

  const removePortfolioLink = (index) => {
    setPortfolioLinks(portfolioLinks.filter((_, i) => i !== index))
  }

  // Certificate handlers
  const addCertificate = () => {
    setCertificates([
      ...certificates,
      {
        name: "",
        issuer: "",
        issueDate: new Date(),
        expiryDate: null,
        credentialId: "",
        image: null,
        imagePreview: null,
      },
    ])
  }

  const updateCertificate = (index, field, value) => {
    const updatedCertificates = [...certificates]
    updatedCertificates[index][field] = value
    setCertificates(updatedCertificates)
  }

  const handleCertificateImage = (index, e) => {
    const file = e.target.files[0]
    if (file) {
      const updatedCertificates = [...certificates]
      updatedCertificates[index].image = file
      updatedCertificates[index].imagePreview = URL.createObjectURL(file)
      setCertificates(updatedCertificates)
    }
  }

  const removeCertificate = (index) => {
    setCertificates(certificates.filter((_, i) => i !== index))
  }

  // Skills handlers
  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => {
      const isSelected = prev.includes(skill)
      return isSelected ? prev.filter((s) => s !== skill) : [...prev, skill]
    })
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Complete Your Profile</h1>
          <p className="text-muted-foreground mt-2">
            Let's set up your professional profile to showcase your skills and experience
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Add your personal and professional details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  placeholder="Senior Developer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  className="resize-none"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">Brief description about yourself (max 500 characters)</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Select the skills you possess</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="skills">Your Skills</Label>
                <div className="flex flex-col gap-2">
                  <Popover open={openSkillsPopover} onOpenChange={setOpenSkillsPopover}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openSkillsPopover}
                        className="justify-between w-full"
                      >
                        Select skills
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search skills..." />
                        <CommandList>
                          <CommandEmpty>No skill found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {skillsList.map((skill) => (
                              <CommandItem key={skill} value={skill} onSelect={() => toggleSkill(skill)}>
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    selectedSkills.includes(skill) ? "opacity-100" : "opacity-0"
                                  }`}
                                />
                                {skill}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedSkills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="px-3 py-1">
                        {skill}
                        <button
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add your professional experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={index} className="space-y-4">
                  {index > 0 && <Separator className="my-6" />}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                    {index > 0 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`experience-title-${index}`}>Job Title</Label>
                      <Input
                        id={`experience-title-${index}`}
                        placeholder="Senior Developer"
                        value={experience.title}
                        onChange={(e) => updateExperience(index, "title", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`experience-company-${index}`}>Company</Label>
                      <Input
                        id={`experience-company-${index}`}
                        placeholder="Acme Inc."
                        value={experience.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`experience-start-${index}`}>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id={`experience-start-${index}`}
                            variant="outline"
                            className="w-full pl-3 text-left font-normal"
                          >
                            {experience.startDate ? (
                              format(experience.startDate, "PPP")
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={experience.startDate}
                            onSelect={(date) => updateExperience(index, "startDate", date)}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex flex-row items-end space-x-3 space-y-0 h-10">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`experience-current-${index}`}
                          checked={experience.current}
                          onChange={(e) => updateExperience(index, "current", e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor={`experience-current-${index}`}>I currently work here</Label>
                      </div>
                    </div>
                  </div>

                  {!experience.current && (
                    <div className="space-y-2">
                      <Label htmlFor={`experience-end-${index}`}>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id={`experience-end-${index}`}
                            variant="outline"
                            className="w-full pl-3 text-left font-normal"
                          >
                            {experience.endDate ? (
                              format(experience.endDate, "PPP")
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={experience.endDate}
                            onSelect={(date) => updateExperience(index, "endDate", date)}
                            disabled={(date) =>
                              date > new Date() || (experience.startDate && date < experience.startDate)
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor={`experience-description-${index}`}>Description</Label>
                    <Textarea
                      id={`experience-description-${index}`}
                      placeholder="Describe your responsibilities and achievements"
                      className="resize-none"
                      value={experience.description}
                      onChange={(e) => updateExperience(index, "description", e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addExperience}>
                <Plus className="h-4 w-4 mr-2" />
                Add Another Experience
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>Add links to your portfolio projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {portfolioLinks.map((link, index) => (
                <div key={index} className="space-y-4">
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Project {index + 1}</h3>
                    {index > 0 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removePortfolioLink(index)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`portfolio-title-${index}`}>Project Title</Label>
                      <Input
                        id={`portfolio-title-${index}`}
                        placeholder="My Awesome Project"
                        value={link.title}
                        onChange={(e) => updatePortfolioLink(index, "title", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`portfolio-url-${index}`}>URL</Label>
                      <Input
                        id={`portfolio-url-${index}`}
                        placeholder="https://myproject.com"
                        value={link.url}
                        onChange={(e) => updatePortfolioLink(index, "url", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addPortfolioLink}>
                <Plus className="h-4 w-4 mr-2" />
                Add Another Project
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>Add your professional certificates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {certificates.map((certificate, index) => (
                <div key={index} className="space-y-4">
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Certificate {index + 1}</h3>
                    {index > 0 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeCertificate(index)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`certificate-name-${index}`}>Certificate Name</Label>
                      <Input
                        id={`certificate-name-${index}`}
                        placeholder="AWS Certified Developer"
                        value={certificate.name}
                        onChange={(e) => updateCertificate(index, "name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`certificate-issuer-${index}`}>Issuing Organization</Label>
                      <Input
                        id={`certificate-issuer-${index}`}
                        placeholder="Amazon Web Services"
                        value={certificate.issuer}
                        onChange={(e) => updateCertificate(index, "issuer", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`certificate-issue-date-${index}`}>Issue Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id={`certificate-issue-date-${index}`}
                            variant="outline"
                            className="w-full pl-3 text-left font-normal"
                          >
                            {certificate.issueDate ? (
                              format(certificate.issueDate, "PPP")
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={certificate.issueDate}
                            onSelect={(date) => updateCertificate(index, "issueDate", date)}
                            disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`certificate-expiry-date-${index}`}>Expiry Date (Optional)</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id={`certificate-expiry-date-${index}`}
                            variant="outline"
                            className="w-full pl-3 text-left font-normal"
                          >
                            {certificate.expiryDate ? (
                              format(certificate.expiryDate, "PPP")
                            ) : (
                              <span className="text-muted-foreground">Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={certificate.expiryDate}
                            onSelect={(date) => updateCertificate(index, "expiryDate", date)}
                            disabled={(date) => certificate.issueDate && date < certificate.issueDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <p className="text-sm text-muted-foreground">Leave empty if the certificate does not expire</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`certificate-id-${index}`}>Credential ID (Optional)</Label>
                    <Input
                      id={`certificate-id-${index}`}
                      placeholder="ABC123XYZ"
                      value={certificate.credentialId}
                      onChange={(e) => updateCertificate(index, "credentialId", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`certificate-image-${index}`}>Certificate Image</Label>
                    <div className="flex items-center gap-4">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor={`certificate-image-${index}`} className="sr-only">
                          Upload Certificate Image
                        </Label>
                        <Input
                          id={`certificate-image-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleCertificateImage(index, e)}
                        />
                      </div>
                      {certificate.imagePreview && (
                        <div className="relative h-20 w-20 overflow-hidden rounded border">
                          <img
                            src={certificate.imagePreview || "/placeholder.svg"}
                            alt="Certificate preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={addCertificate}>
                <Plus className="h-4 w-4 mr-2" />
                Add Another Certificate
              </Button>
            </CardContent>
          </Card>

         {/* location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>Where are you based?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="San Francisco" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Request for Verification
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

