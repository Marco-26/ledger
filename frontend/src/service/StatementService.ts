import { apiClient } from "./client";
import type { IStatement } from "@/data/StatementDtos";
import StatementDataAdapter from "./adapters/StatementDataAdapter";

export class StatementService {
  readonly baseURL = "/statement";

  public async generateStatement(file: File): Promise<IStatement> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post(this.baseURL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const statement = StatementDataAdapter.convertToStatement(response.data);

    return statement;
  }
}

export const statementService = new StatementService();
