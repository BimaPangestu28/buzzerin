"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SocialMediaItem = {
  id: string;
  platform: string;
  username: string;
  link: string;
  followers?: number;
  subscribers?: number;
}

export function SocialMediaForm() {
  const [socialMedias, setSocialMedias] = useState<SocialMediaItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addSocialMedia = () => {
    setSocialMedias([
      ...socialMedias,
      {
        id: Date.now().toString(),
        platform: "",
        username: "",
        link: "",
      },
    ])
  }

  const removeSocialMedia = (id: string) => {
    setSocialMedias(socialMedias.filter((item) => item.id !== id))
  }

  const updateSocialMedia = (id: string, field: keyof SocialMediaItem, value: string | number) => {
    setSocialMedias(
      socialMedias.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      console.log(socialMedias)
      // Add your API call here
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          {socialMedias.map((item) => (
            <div key={item.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <Select
                  value={item.platform}
                  onValueChange={(value) => updateSocialMedia(item.id, "platform", value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSocialMedia(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Username</label>
                  <Input
                    value={item.username}
                    onChange={(e) => updateSocialMedia(item.id, "username", e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Profile Link</label>
                  <Input
                    value={item.link}
                    onChange={(e) => updateSocialMedia(item.id, "link", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {item.platform === "youtube" ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subscribers</label>
                    <Input
                      type="number"
                      value={item.subscribers || ""}
                      onChange={(e) => updateSocialMedia(item.id, "subscribers", parseInt(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Followers</label>
                    <Input
                      type="number"
                      value={item.followers || ""}
                      onChange={(e) => updateSocialMedia(item.id, "followers", parseInt(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addSocialMedia}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Media
          </Button>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}