import { UseCaseResponse } from "../../../usecases/ports/infrastructure";
import BaseException from "../exceptions/baseException";
import { ApiResponse } from "../models";

export default interface ApiResponseMapper {
	mapUseCaseResponseToApiResponse(useCaseResponse: UseCaseResponse): ApiResponse;
	mapErrorToApiResponse(error: BaseException): ApiResponse;
}
