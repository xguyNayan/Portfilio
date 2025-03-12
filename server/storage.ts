import { 
  type User, type InsertUser,
  type Post, type InsertPost,
  type Project, type InsertProject,
  type Chat, type InsertChat
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Post operations
  getPosts(): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  
  // Project operations
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Chat operations
  getChatsByUser(userId: number): Promise<Chat[]>;
  createChat(chat: InsertChat): Promise<Chat>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private posts: Map<number, Post>;
  private projects: Map<number, Project>;
  private chats: Map<number, Chat>;
  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.posts = new Map();
    this.projects = new Map();
    this.chats = new Map();
    this.currentId = { users: 1, posts: 1, projects: 1, chats: 1 };

    // Initialize with mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Add mock users
    const mockUsers: InsertUser[] = [
      {
        username: "johndoe",
        name: "John Doe",
        bio: "Full Stack Developer | UI/UX Enthusiast | Open Source Contributor",
        avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1",
        password: "password123"
      }
    ];

    mockUsers.forEach(user => this.createUser(user));

    // Add mock posts (skills and experiences)
    const mockPosts: InsertPost[] = [
      {
        userId: 1,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        caption: "5 years of experience building scalable web applications using React, Node.js, and PostgreSQL. Love turning complex problems into simple, beautiful solutions.",
        likes: 42
      },
      {
        userId: 1,
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        caption: "Recently completed an advanced certification in Cloud Architecture. Passionate about building robust, cloud-native applications.",
        likes: 38
      },
      {
        userId: 1,
        image: "https://images.unsplash.com/photo-1552308995-2baac1ad5490",
        caption: "Led a team of 5 developers to deliver a mission-critical project for a Fortune 500 client. Focused on agile methodologies and continuous improvement.",
        likes: 56
      }
    ];

    mockPosts.forEach(post => this.createPost(post));

    // Add mock projects
    const mockProjects: InsertProject[] = [
      {
        userId: 1,
        title: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform using Next.js and Stripe",
        thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c"
      },
      {
        userId: 1,
        title: "AI Chat Assistant",
        description: "Developed an AI-powered chat assistant using OpenAI's GPT",
        thumbnail: "https://images.unsplash.com/photo-1677442719960-ca3876179d80"
      },
      {
        userId: 1,
        title: "Mobile Fitness App",
        description: "React Native app for workout tracking and social fitness",
        thumbnail: "https://images.unsplash.com/photo-1461887046916-c7426e65460d"
      },
      {
        userId: 1,
        title: "Cloud Infrastructure",
        description: "Designed and implemented scalable AWS architecture",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
      },
      {
        userId: 1,
        title: "Portfolio Website",
        description: "Modern, responsive portfolio with Three.js animations",
        thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
      },
      {
        userId: 1,
        title: "Social Media Dashboard",
        description: "Real-time analytics dashboard with data visualization",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
      },
      {
        userId: 1,
        title: "Blockchain Wallet",
        description: "Secure crypto wallet with multi-chain support",
        thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0"
      },
      {
        userId: 1,
        title: "Game Development",
        description: "3D multiplayer game using Unity and WebGL",
        thumbnail: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f"
      }
    ];

    mockProjects.forEach(project => this.createProject(project));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.users++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Post operations
  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values());
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentId.posts++;
    const post: Post = { 
      ...insertPost, 
      id,
      createdAt: new Date()
    };
    this.posts.set(id, post);
    return post;
  }

  // Project operations
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId.projects++;
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  // Chat operations
  async getChatsByUser(userId: number): Promise<Chat[]> {
    return Array.from(this.chats.values()).filter(
      chat => chat.userId === userId
    );
  }

  async createChat(insertChat: InsertChat): Promise<Chat> {
    const id = this.currentId.chats++;
    const chat: Chat = {
      ...insertChat,
      id,
      createdAt: new Date()
    };
    this.chats.set(id, chat);
    return chat;
  }
}

export const storage = new MemStorage();