"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const LOCATIONS = [
  "Jakarta",
  "Surabaya",
  "Bandung",
  "Medan",
  // Add more locations
];

const INTERESTS = [
  "Fashion",
  "Beauty",
  "Technology",
  "Gaming",
  "Fitness",
  "Food",
  // Add more interests
];

const PLATFORMS = ["Instagram", "TikTok", "YouTube", "Twitter"];

const PACKAGES: Package[] = [
  {
    id: "basic",
    name: "Basic Post",
    description: "Single post with basic engagement",
    price: 50,
    features: ["1 Social Media Post", "Basic Caption", "24h Delivery"],
  },
  {
    id: "premium",
    name: "Premium Content",
    description: "High-quality content with strategic posting",
    price: 100,
    features: [
      "1 Premium Post",
      "Engaging Caption",
      "Hashtag Research",
      "Best Time Posting",
      "48h Delivery",
    ],
  },
  // Add more packages
];

export default function CreateJobPage() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [estimatedReach, setEstimatedReach] = useState<number>(0);
  const { toast } = useToast();

  const form = useForm<JobFormData>({
    defaultValues: {
      title: "",
      description: "",
      budget: 0,
      deadline: "",
      audience: {
        location: [],
        age: { min: 18, max: 65 },
        gender: "all",
        interests: [],
        platforms: [],
        followersRange: { min: 1000, max: 100000 },
        engagementRate: { min: 1, max: 10 },
      },
      tasks: [],
    },
  });

  const calculateEstimatedReach = (values: JobFormData) => {
    // This would be your algorithm to calculate estimated reach
    // Based on selected audience parameters
    const baseReach = 1000000;
    const locationMultiplier = values.audience.location.length * 0.2;
    const ageRange = values.audience.age.max - values.audience.age.min;
    const ageMultiplier = ageRange * 0.1;
    const interestsMultiplier = values.audience.interests.length * 0.15;

    const estimated = Math.floor(
      baseReach *
        (1 + locationMultiplier) *
        (1 + ageMultiplier) *
        (1 + interestsMultiplier)
    );

    setEstimatedReach(estimated);
  };

  const calculateTotalCost = (tasks: Task[]) => {
    return tasks.reduce((total, task) => total + task.subtotal, 0);
  };

  const addTask = () => {
    const tasks = form.getValues("tasks");
    form.setValue("tasks", [
      ...tasks,
      {
        id: `task-${tasks.length + 1}`,
        title: "",
        description: "",
        selectedPackage: PACKAGES[0],
        quantity: 1,
        subtotal: PACKAGES[0].price,
      },
    ]);
  };

  const removeTask = (taskId: string) => {
    const tasks = form.getValues("tasks");
    form.setValue(
      "tasks",
      tasks.filter((task) => task.id !== taskId)
    );
  };

  const updateTaskSubtotal = (
    taskId: string,
    package_: Package,
    quantity: number
  ) => {
    const tasks = form.getValues("tasks");
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          selectedPackage: package_,
          quantity,
          subtotal: package_.price * quantity,
        };
      }
      return task;
    });
    form.setValue("tasks", updatedTasks);
  };

  const onSubmit = async (data: JobFormData) => {
    const totalCost = calculateTotalCost(data.tasks);
    // Check if user has enough balance
    const userBalance = 5000; // Get this from your user state/API

    if (totalCost > userBalance) {
      toast({
        title: "Insufficient Balance",
        description: `You need ${
          totalCost - userBalance
        } more credits to create this job`,
        variant: "destructive",
      });
      return;
    }

    setIsConfirmOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Job</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter job title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Describe your job requirements"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deadline</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Audience Targeting */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Targeting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Locations */}
              <FormField
                control={form.control}
                name="audience.location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Locations</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={LOCATIONS}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select locations"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Age Range */}
              <FormField
                control={form.control}
                name="audience.age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Range</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Slider
                          min={13}
                          max={65}
                          step={1}
                          value={[field.value.min, field.value.max]}
                          onValueChange={([min, max]) =>
                            field.onChange({ min, max })
                          }
                        />
                        <div className="flex justify-between text-sm">
                          <span>{field.value.min} years</span>
                          <span>{field.value.max} years</span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="audience.gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              {/* Interests */}
              <FormField
                control={form.control}
                name="audience.interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={INTERESTS}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select interests"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Platforms */}
              <FormField
                control={form.control}
                name="audience.platforms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Platforms</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={PLATFORMS}
                        selected={field.value}
                        onChange={field.onChange}
                        placeholder="Select platforms"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Followers Range */}
              <FormField
                control={form.control}
                name="audience.followersRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Followers Range</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Slider
                          min={1000}
                          max={1000000}
                          step={1000}
                          value={[field.value.min, field.value.max]}
                          onValueChange={([min, max]) =>
                            field.onChange({ min, max })
                          }
                        />
                        <div className="flex justify-between text-sm">
                          <span>
                            {field.value.min.toLocaleString()} followers
                          </span>
                          <span>
                            {field.value.max.toLocaleString()} followers
                          </span>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Estimated Reach */}
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Estimated Reach</h4>
                    <p className="text-sm text-gray-500">
                      Potential creators matching your criteria
                    </p>
                  </div>
                  <div className="text-2xl font-bold">
                    {estimatedReach.toLocaleString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tasks</CardTitle>
              <Button type="button" onClick={addTask}>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {form.watch("tasks").map((task, index) => (
                  <Card key={task.id}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-lg">
                        Task {index + 1}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTask(task.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`tasks.${index}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Task Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter task title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        control={form.control}
                        name={`tasks.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Describe what needs to be done"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`tasks.${index}.selectedPackage`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Package</FormLabel>
                              <Select
                                value={field.value.id}
                                onValueChange={(value) => {
                                  const package_ = PACKAGES.find(
                                    (p) => p.id === value
                                  )!;
                                  field.onChange(package_);
                                  updateTaskSubtotal(
                                    task.id,
                                    package_,
                                    task.quantity
                                  );
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select package" />
                                </SelectTrigger>
                                <SelectContent>
                                  {PACKAGES.map((package_) => (
                                    <SelectItem
                                      key={package_.id}
                                      value={package_.id}
                                    >
                                      <div>
                                        <div className="font-medium">
                                          {package_.name}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          ${package_.price}
                                        </div>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                                  {field.value.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                  ))}
                                </ul>
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`tasks.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  {...field}
                                  onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    field.onChange(value);
                                    updateTaskSubtotal(
                                      task.id,
                                      task.selectedPackage,
                                      value
                                    );
                                  }}
                                />
                              </FormControl>
                              <FormDescription>
                                Subtotal: ${task.subtotal}
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {form.watch("tasks").length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No tasks added yet. Click "Add Task" to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cost Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Cost Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {form.watch("tasks").map((task) => (
                  <div
                    key={task.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">
                        {task.title || "Untitled Task"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {task.selectedPackage.name} x {task.quantity}
                      </div>
                    </div>
                    <div className="font-medium">${task.subtotal}</div>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center font-bold">
                    <div>Total Cost</div>
                    <div>${calculateTotalCost(form.watch("tasks"))}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" disabled={form.watch("tasks").length === 0}>
              Create Job
            </Button>
          </div>
        </form>
      </Form>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Job Creation</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to create a job with {form.watch("tasks").length}{" "}
              tasks for a total of ${calculateTotalCost(form.watch("tasks"))}.
              This amount will be deducted from your balance. Are you sure you
              want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  // Add your API call here
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  toast({
                    title: "Success",
                    description: "Job created successfully",
                  });
                  // Reset form or redirect
                } catch (error) {
                  toast({
                    title: "Error",
                    description: "Failed to create job",
                    variant: "destructive",
                  });
                }
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// components/multi-select.tsx
interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            <div className="flex flex-wrap gap-1">
              {selected.slice(0, 2).map((value) => (
                <Badge variant="secondary" key={value} className="mr-1">
                  {value}
                </Badge>
              ))}
              {selected.length > 2 && (
                <Badge variant="secondary">+{selected.length - 2}</Badge>
              )}
            </div>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder}...`} />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-64">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    onChange(
                      selected.includes(option)
                        ? selected.filter((x) => x !== option)
                        : [...selected, option]
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option}
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
