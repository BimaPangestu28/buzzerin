"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { JobList } from "./job-list"
import { Search, SlidersHorizontal } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

interface FilterState {
  search: string;
  sortBy: string;
  budgetRange: [number, number];
  skills: string[];
  onlyMatchingSkills: boolean;
  platforms: string[];
}

export default function JobsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    sortBy: "newest",
    budgetRange: [0, 10000],
    skills: [],
    onlyMatchingSkills: false,
    platforms: [],
  })

  const skills = [
    "Content Creation",
    "Photography",
    "Video Editing",
    "Copywriting",
    "Social Media Management",
    "Graphic Design",
  ]

  const platforms = [
    "Instagram",
    "TikTok",
    "YouTube",
    "Twitter",
    "Facebook",
  ]

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleFilterReset = () => {
    setFilters({
      search: "",
      sortBy: "newest",
      budgetRange: [0, 10000],
      skills: [],
      onlyMatchingSkills: false,
      platforms: [],
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Available Jobs</h1>
            <p className="text-gray-500">Find the perfect job that matches your skills</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-2">
            <div className="flex-1 md:w-[300px]">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search jobs..."
                  className="pl-8"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                />
              </div>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your job search
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  <div className="space-y-4">
                    <Label>Sort By</Label>
                    <Select
                      value={filters.sortBy}
                      onValueChange={(value) => handleFilterChange('sortBy', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sorting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="budget_high">Highest Budget</SelectItem>
                        <SelectItem value="budget_low">Lowest Budget</SelectItem>
                        <SelectItem value="deadline">Deadline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Budget Range</Label>
                    <Slider
                      min={0}
                      max={10000}
                      step={100}
                      value={filters.budgetRange}
                      onValueChange={(value) => handleFilterChange('budgetRange', value)}
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>${filters.budgetRange[0]}</span>
                      <span>${filters.budgetRange[1]}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Required Skills</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={skill}
                            checked={filters.skills.includes(skill)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleFilterChange('skills', [...filters.skills, skill])
                              } else {
                                handleFilterChange(
                                  'skills',
                                  filters.skills.filter((s) => s !== skill)
                                )
                              }
                            }}
                          />
                          <label
                            htmlFor={skill}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Platforms</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {platforms.map((platform) => (
                        <div
                          key={platform}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={platform}
                            checked={filters.platforms.includes(platform)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleFilterChange('platforms', [...filters.platforms, platform])
                              } else {
                                handleFilterChange(
                                  'platforms',
                                  filters.platforms.filter((p) => p !== platform)
                                )
                              }
                            }}
                          />
                          <label
                            htmlFor={platform}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {platform}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="matching-skills"
                      checked={filters.onlyMatchingSkills}
                      onCheckedChange={(checked) => 
                        handleFilterChange('onlyMatchingSkills', checked)
                      }
                    />
                    <label
                      htmlFor="matching-skills"
                      className="text-sm font-medium leading-none"
                    >
                      Only show jobs matching my skills
                    </label>
                  </div>
                </div>

                <SheetFooter>
                  <div className="flex w-full space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleFilterReset}
                      className="flex-1"
                    >
                      Reset
                    </Button>
                    <Button className="flex-1">
                      Apply Filters
                    </Button>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.skills.length > 0 || 
          filters.platforms.length > 0 || 
          filters.onlyMatchingSkills || 
          filters.search) && (
          <Card>
            <CardHeader className="py-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm">Active Filters</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFilterReset}
                >
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="py-3">
              <div className="flex flex-wrap gap-2">
                {filters.search && (
                  <Badge variant="secondary" className="text-sm">
                    Search: {filters.search}
                  </Badge>
                )}
                {filters.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
                {filters.platforms.map((platform) => (
                  <Badge key={platform} variant="secondary" className="text-sm">
                    {platform}
                  </Badge>
                ))}
                {filters.onlyMatchingSkills && (
                  <Badge variant="secondary" className="text-sm">
                    Matching Skills Only
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Job List */}
        <JobList filters={filters} />
      </div>
    </div>
  )
}