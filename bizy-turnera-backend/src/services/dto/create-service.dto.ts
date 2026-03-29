import { IsInt, IsNumber, IsString, Min } from "class-validator";

export class CreateServiceDto {


  @IsString()
  name: string;

  @IsInt()
  @Min(5)
  duration: number;

  @IsNumber()
  @Min(0)
  price: number;
}
