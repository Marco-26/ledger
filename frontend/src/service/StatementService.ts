import { apiClient } from "./client";
import type { IStatement } from "@/data/StatementDtos";
import StatementDataAdapter from "./adapters/StatementDataAdapter";
import { Constants } from "@/utils/Constants";

export class StatementService {
  readonly baseURL = "/statement";

  public async postStatement(file: File, date: string): Promise<IStatement> {
    const formData = new FormData();
    formData.append(Constants.API.GENERATE_STATEMENT_FORMDATA_KEY, file);

    const url = `${this.baseURL}?${Constants.API.QUERY_PARAMS.DATE}=${encodeURIComponent(date)}`;
    const response = await apiClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return StatementDataAdapter.convertToStatement(response.data);
  }

  public async fetchStatement(date: string): Promise<IStatement> {
    const url = `${this.baseURL}?${Constants.API.QUERY_PARAMS.DATE}=${encodeURIComponent(date)}`;
    const response = await apiClient.get(url);
    return StatementDataAdapter.convertToStatement(response.data);
  }
}

export const statementService = new StatementService();
