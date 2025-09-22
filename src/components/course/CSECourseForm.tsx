import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Code, Database, Cpu, Globe, BookOpen, GraduationCap, Lightbulb } from "lucide-react";
import GlassMorphism from "@/components/ui/GlassMorphism";
import { CourseType } from "@/types";

interface CSECourseFormProps {
  onSubmit: (courseName: string, purpose: CourseType['purpose'], difficulty: CourseType['difficulty'], customPrompt?: string, includeExamPrep?: boolean) => void;
  isLoading: boolean;
}

const cseSubjects = [
  { name: "Data Structures & Algorithms", icon: <Code className="h-4 w-4" />, category: "core" },
  { name: "Database Management Systems", icon: <Database className="h-4 w-4" />, category: "core" },
  { name: "Computer Networks", icon: <Globe className="h-4 w-4" />, category: "core" },
  { name: "Operating Systems", icon: <Cpu className="h-4 w-4" />, category: "core" },
  { name: "Software Engineering", icon: <BookOpen className="h-4 w-4" />, category: "core" },
  { name: "Machine Learning", icon: <Lightbulb className="h-4 w-4" />, category: "advanced" },
  { name: "Computer Graphics", icon: <Cpu className="h-4 w-4" />, category: "advanced" },
  { name: "Compiler Design", icon: <Code className="h-4 w-4" />, category: "advanced" },
];

const purposeOptions = [
  { value: "exam_preparation", label: "Exam Preparation", description: "Study for upcoming exams or assessments" },
  { value: "job_interview", label: "Interview Prep", description: "Prepare for technical interviews" },
  { value: "skill_development", label: "Skill Development", description: "Learn new concepts and improve understanding" },
  { value: "project_work", label: "Project Work", description: "Support for ongoing projects or assignments" },
];

const difficultyOptions = [
  { value: "beginner", label: "Beginner", description: "Basic concepts and fundamentals" },
  { value: "intermediate", label: "Intermediate", description: "Standard university level topics" },
  { value: "advanced", label: "Advanced", description: "Complex topics and research level concepts" },
];

const CSECourseForm = ({ onSubmit, isLoading }: CSECourseFormProps) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [customTopic, setCustomTopic] = useState<string>("");
  const [purpose, setPurpose] = useState<CourseType['purpose']>("exam_preparation");
  const [difficulty, setDifficulty] = useState<CourseType['difficulty']>("intermediate");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [includeExamPrep, setIncludeExamPrep] = useState<boolean>(true);
  const [showNonCSEWarning, setShowNonCSEWarning] = useState<boolean>(false);

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubject(subject);
    setCustomTopic("");
    setShowNonCSEWarning(false);
  };

  const handleCustomTopicChange = (value: string) => {
    setCustomTopic(value);
    setSelectedSubject("");
    
    // Check if the topic seems to be non-CSE related
    const nonCSEKeywords = ['biology', 'chemistry', 'physics', 'history', 'geography', 'literature', 'arts', 'music', 'medical', 'civil', 'mechanical', 'electrical'];
    const isNonCSE = nonCSEKeywords.some(keyword => 
      value.toLowerCase().includes(keyword)
    );
    setShowNonCSEWarning(isNonCSE);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const courseName = selectedSubject || customTopic;
    
    if (!courseName.trim()) return;
    
    if (showNonCSEWarning) {
      return; // Don't submit if it's a non-CSE topic
    }
    
    onSubmit(courseName, purpose, difficulty, customPrompt, includeExamPrep);
  };

  const isFormValid = (selectedSubject || customTopic.trim()) && !showNonCSEWarning;

  return (
    <GlassMorphism className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            CSE Course Generator
          </h2>
          <p className="text-muted-foreground">
            Generate comprehensive courses for Computer Science Engineering topics with exam preparation materials.
          </p>
        </div>

        {/* Subject Selection */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Select CSE Subject</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {cseSubjects.map((subject) => (
              <Button
                key={subject.name}
                type="button"
                variant={selectedSubject === subject.name ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-center gap-2 text-left"
                onClick={() => handleSubjectSelect(subject.name)}
              >
                {subject.icon}
                <span className="text-xs text-center leading-tight">{subject.name}</span>
                <Badge variant={subject.category === "core" ? "default" : "secondary"} className="text-xs">
                  {subject.category}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Topic Input */}
        <div className="space-y-2">
          <Label htmlFor="customTopic" className="text-base font-medium">Or Enter Custom Topic</Label>
          <Input
            id="customTopic"
            placeholder="e.g., Advanced Graph Algorithms, React.js Fundamentals..."
            value={customTopic}
            onChange={(e) => handleCustomTopicChange(e.target.value)}
            className="w-full"
          />
        </div>

        {showNonCSEWarning && (
          <Alert variant="destructive">
            <AlertDescription>
              This platform is specifically designed for Computer Science Engineering students. 
              Please select a CSE-related topic or choose from the predefined subjects above.
            </AlertDescription>
          </Alert>
        )}

        {/* Purpose Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Course Purpose</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {purposeOptions.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={purpose === option.value ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-start text-left"
                onClick={() => setPurpose(option.value as CourseType['purpose'])}
              >
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground mt-1">{option.description}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Difficulty Level</Label>
          <div className="grid grid-cols-3 gap-3">
            {difficultyOptions.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={difficulty === option.value ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-center text-center"
                onClick={() => setDifficulty(option.value as CourseType['difficulty'])}
              >
                <span className="font-medium">{option.label}</span>
                <span className="text-xs text-muted-foreground mt-1">{option.description}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Exam Preparation Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="examPrep"
            checked={includeExamPrep}
            onChange={(e) => setIncludeExamPrep(e.target.checked)}
            className="rounded border-gray-300"
          />
          <Label htmlFor="examPrep" className="text-sm">
            Include exam preparation materials (MCQs, practice questions, mock tests)
          </Label>
        </div>

        {/* Custom Prompt */}
        <div className="space-y-2">
          <Label htmlFor="customPrompt" className="text-base font-medium">
            Additional Requirements (Optional)
          </Label>
          <Textarea
            id="customPrompt"
            placeholder="e.g., Focus on coding implementations, include real-world examples, emphasis on interview questions..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={3}
            className="w-full"
          />
        </div>

        <Button 
          type="submit" 
          disabled={!isFormValid || isLoading}
          className="w-full h-12 text-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating Course Layout...
            </>
          ) : (
            "Generate CSE Course"
          )}
        </Button>
      </form>
    </GlassMorphism>
  );
};

export default CSECourseForm;