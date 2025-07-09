import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, NotFoundException, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class ErrorHandleService {

    handleErrors(response: any) {
        // if not normal case -> throw error
        if (![200, 201].includes((parseInt(response.statusCode, 10)))) {
            switch (parseInt(response.statusCode, 10)) {
                case 400: // wrong format/data type, missing field,
                    throw new BadRequestException({ statusCode: response.statusCode, message: response.messages })

                case 401: // Unauthorized
                    throw new UnauthorizedException({ statusCode: response.statusCode, message: response.messages })

                case 403: // Forbidden
                    throw new ForbiddenException({ statusCode: response.statusCode, message: response.messages })

                case 404: // Not found
                    throw new NotFoundException({ statusCode: response.statusCode, message: response.messages })

                default:
                    throw new InternalServerErrorException({ statusCode: 500, message: response.messages || 'Internal Server Error !' })

            }
        }
        return response;
    }
}