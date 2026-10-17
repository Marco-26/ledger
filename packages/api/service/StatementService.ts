import { apiClient } from "./client";
import type { IStatement, IYearlyStatement } from "../data/StatementDtos";
import StatementDataAdapter from "./adapters/StatementDataAdapter";
import { Constants } from "../utils/constants";

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

  public async fetchStatement(date?: string): Promise<IStatement> {
    if(!date) return Promise.reject();

    const url = `${this.baseURL}?${Constants.API.QUERY_PARAMS.DATE}=${encodeURIComponent(date)}`;
    const response = await apiClient.get(url);
    return StatementDataAdapter.convertToStatement(response.data);
  }

  public async deleteStatement(statementId: number): Promise<void> {
    const url = `${this.baseURL}?${Constants.API.QUERY_PARAMS.STATEMENT_ID}=${statementId}`;
    await apiClient.delete(url);
  }

  public async fetchYearlyStatement(year?: number): Promise<IYearlyStatement> {
    if(!year) return Promise.reject();

    const url = `${this.baseURL}/yearly?${Constants.API.QUERY_PARAMS.YEAR}=${year}`;
    const response = await apiClient.get(url);
    return StatementDataAdapter.convertToYearlyStatement(response.data);
  }
}

export const statementService = new StatementService();
