import { StatusCodes } from 'http-status-codes';
import Resource from './resource';

export default interface ApiResponse {
  statusCode: StatusCodes;
  data?: Resource | Resource[];
  error?: string;
}
