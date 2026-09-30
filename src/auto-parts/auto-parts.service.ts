import { Injectable, NotFoundException } from '@nestjs/common';
import { AutoPart } from './auto-part.entity';
import { CreateAutoPartDto } from './dto/create-auto-part.dto';
import { randomUUID } from 'crypto';
import { UpdateAutoPartDto } from './dto/update-auto-part.dto';

@Injectable()
export class AutoPartsService {
    private items: AutoPart[] = [
    {
      id: '1',
      title: 'Гальмівні колодки',
      price: 1800,
      oemCode: '5Q0698151',
      condition: 'new',
      carBrand: 'Volkswagen',
    },
    {
      id: '2',
      title: 'Повітряний фільтр',
      price: 650,
      oemCode: 'C37153',
      condition: 'new',
      carBrand: 'BMW',
    },
    {
      id: '3',
      title: 'Передня фара',
      price: 7200,
      oemCode: '8W0941034',
      condition: 'used',
      carBrand: 'Audi',
    },
  ];

  findAll(search?: string, limit?: string): AutoPart[] {
  let result = this.items;

  if (search) {
    const searchValue = search.toLowerCase();

    result = result.filter((item) =>
      item.title.toLowerCase().includes(searchValue),
    );
  }

  if (limit) {
    const parsedLimit = Number(limit);

    if (Number.isInteger(parsedLimit) && parsedLimit > 0) {
      result = result.slice(0, parsedLimit);
    }
  }

  return result;
}

  findOne(id: string): AutoPart {
  const item = this.items.find((item) => item.id === id);

  if (!item) {
    throw new NotFoundException(
      `Сутність з ID ${id} не знайдена`,
    );
  }

  return item;
}

create(dto: CreateAutoPartDto) : AutoPart {
    const item: AutoPart = {
        id: randomUUID(),
        ...dto,
    }

    this.items.push(item)

    return item;
}

update(id: string, dto: UpdateAutoPartDto): AutoPart {
  const item = this.findOne(id);

  Object.assign(item, dto);

  return item;
}

remove(id: string): void {
  const index = this.items.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new NotFoundException(
      `Сутність з ID ${id} не знайдена`,
    );
  }

  this.items.splice(index, 1);
}
}
