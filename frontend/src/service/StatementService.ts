import { apiClient } from "./client";
import type { IStatement } from "@/data/StatementDtos";
import StatementDataAdapter from "./adapters/StatementDataAdapter";
import { Constants } from "@/utils/Constants";

export class StatementService {
  readonly baseURL = "/statement";

  public async generateStatement(
    file: File,
    date: string,
  ): Promise<IStatement> {
    try {
      const formData = new FormData();
      formData.append(Constants.API.GENERATE_STATEMENT_FORMDATA_KEY, file);

      const url = `${this.baseURL}?${Constants.API.QUERY_PARAMS.DATE}=${encodeURIComponent(date)}`;
      const response = await apiClient.post(url, formData, {
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
      const url = `${this.baseURL}?${Constants.API.QUERY_PARAMS.DATE}=${encodeURIComponent(date)}`;
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
