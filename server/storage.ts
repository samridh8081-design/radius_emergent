import { type User, type InsertUser, type AnalysisResult } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  saveAnalysis(analysis: AnalysisResult): Promise<void>;
  getAnalysis(url: string): Promise<AnalysisResult | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private analyses: Map<string, AnalysisResult>;

  constructor() {
    this.users = new Map();
    this.analyses = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveAnalysis(analysis: AnalysisResult): Promise<void> {
    this.analyses.set(analysis.url, analysis);
  }

  async getAnalysis(url: string): Promise<AnalysisResult | undefined> {
    return this.analyses.get(url);
  }
}

export const storage = new MemStorage();
