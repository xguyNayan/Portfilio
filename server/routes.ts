import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertPostSchema, insertProjectSchema, insertChatSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    const user = await storage.getUser(parseInt(req.params.id));
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  });

  app.post("/api/users", async (req, res) => {
    const result = insertUserSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid user data" });
      return;
    }
    const user = await storage.createUser(result.data);
    res.json(user);
  });

  // Post routes
  app.get("/api/posts", async (_req, res) => {
    const posts = await storage.getPosts();
    res.json(posts);
  });

  app.post("/api/posts", async (req, res) => {
    const result = insertPostSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid post data" });
      return;
    }
    const post = await storage.createPost(result.data);
    res.json(post);
  });

  // Project routes
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post("/api/projects", async (req, res) => {
    const result = insertProjectSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid project data" });
      return;
    }
    const project = await storage.createProject(result.data);
    res.json(project);
  });

  // Chat routes
  app.get("/api/chats/:userId", async (req, res) => {
    const chats = await storage.getChatsByUser(parseInt(req.params.userId));
    res.json(chats);
  });

  app.post("/api/chats", async (req, res) => {
    const result = insertChatSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: "Invalid chat data" });
      return;
    }
    const chat = await storage.createChat(result.data);
    res.json(chat);
  });

  const httpServer = createServer(app);
  return httpServer;
}
