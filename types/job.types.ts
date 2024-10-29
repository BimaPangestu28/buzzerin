interface AudienceTarget {
    location: string[];
    age: {
      min: number;
      max: number;
    };
    gender: 'all' | 'male' | 'female';
    interests: string[];
    platforms: string[];
    followersRange: {
      min: number;
      max: number;
    };
    engagementRate: {
      min: number;
      max: number;
    };
  }
  
  interface Package {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
  }
  
  interface Task {
    id: string;
    title: string;
    description: string;
    selectedPackage: Package;
    quantity: number;
    subtotal: number;
  }
  
  interface JobFormData {
    title: string;
    description: string;
    budget: number;
    deadline: string;
    audience: AudienceTarget;
    tasks: Task[];
  }
  
  