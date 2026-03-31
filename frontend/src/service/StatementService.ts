import { apiClient } from "./client";
import type { IStatement } from "@/data/StatementDtos";
import StatementDataAdapter from "./adapters/StatementDataAdapter";

export class StatementService {
  readonly baseURL = "/statement";

  public async generateStatement(file: File): Promise<IStatement> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post(this.baseURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const statement = StatementDataAdapter.convertToStatement(response.data);

      return statement;
    } catch (error) {
      console.error("Error in StatementService.generateStatement:", error);
      return Promise.reject(error);
    }
  }

  public async fetchStatement(date: string): Promise<IStatement> {
    try {
      const url = `${this.baseURL}?date=${encodeURIComponent(date)}`;
      const response = await apiClient.get(url);

      const statement = StatementDataAdapter.convertToStatement(response.data);

      return statement;
    } catch (error) {
      console.error("Error in StatementService.fetchStatement:", error);
      return Promise.reject(error);
    }
  }
}

export const statementService = new StatementService();
