export type Province = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  provinceId: string;
  name: string;
};

export type District = {
  id: string;
  cityId: string;
  name: string;
};

export type SocialMediaPlatform =
  | "instagram"
  | "youtube"
  | "tiktok"
  | "twitter"
  | "linkedin";

export type SocialMedia = {
  id: string;
  platform: SocialMediaPlatform;
  username: string;
  link: string;
  followers?: number;
  subscribers?: number;
};

export type Job = {
  id: string;
  title: string;
  deadline: string;
  description: string;
  goals: string[];
  requirements: string[];
  quota: {
    total: number;
    filled: number;
  };
  budget: number;
  status: "open" | "closed" | "in_progress" | "review" | "completed";
  client: {
    name: string;
    avatar: string;
  };
  milestones: Milestone[];
  progress: number;
};

export interface Milestone {
  id: string;
  title: string;
  status: "pending" | "completed";
  due_date: string;
  evidence?: Evidence[];
}

export interface Evidence {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
  url: string;
}

interface UserProfile {
    type: 'freelancer' | 'employer';
    name: string;
    avatar: string;
    points?: number;
    balance?: number;
  }
  
  interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning';
    message: string;
    timestamp: string;
    isRead: boolean;
  }
  
  interface RelatedJob {
    id: string;
    title: string;
    budget: number;
    deadline: string;
    skillMatch: number;
    description: string;
  }