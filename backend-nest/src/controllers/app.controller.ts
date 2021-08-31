import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { User } from '@entities/user.entity';
import prepareUser from '@services/user';
import axios from 'axios';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UpdateRating, ApiUser } from '@services/swagger';

const baseUrl = 'https://randomuser.me';

const create = async (item: {
  large_photo: string;
  phone: string;
  name: string;
  rating: number;
  photo: string;
  login: string;
  email: string;
}) => {
  const article = new User(
    item.name,
    item.photo,
    item.large_photo,
    item.login,
    item.email,
    item.phone,
    item.rating,
  );
  await article.save();
};

@Controller()
export class AppController {
  @ApiTags('Users')
  @ApiOperation({ summary: 'Returns all users.' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: {
        $ref: getSchemaPath(ApiUser),
      },
    },
  })
  @Get('/users')
  async getUsers() {
    const users = await User.find();
    if (users.length) {
      return users;
    } else {
      const result = await axios.get(
        `${baseUrl}/api/?results=25&seed=abc&inc=name,
                login,email,phone,picture`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const parsedBody = await result.data.results;
      for (const item of parsedBody) {
        const user = prepareUser(item);
        await create(user);
      }

      return await User.find();
    }
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Returns a user by id.' })
  @ApiOkResponse({
    type: ApiUser,
  })
  @Get('users/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return User.findOne({ id });
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Updates a user by id.' })
  @ApiBody({
    type: UpdateRating,
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        result: {
          $ref: getSchemaPath(ApiUser),
        },
        message: {
          type: 'string',
          example: 'User successfully updated.',
        },
      },
    },
  })
  @Put('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRating,
  ) {
    await User.update({ id }, body);
    return {
      result: await User.findOne({ id }),
      message: 'User successfully updated.',
    };
  }

  @ApiTags('Users')
  @ApiOperation({ summary: 'Deletes a user by id.' })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        result: {
          $ref: getSchemaPath(ApiUser),
        },
        message: {
          type: 'string',
          example: 'User successfully deleted.',
        },
      },
    },
  })
  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    const user = await User.findOne({ id });
    await User.delete({ id });
    return {
      result: await user,
      message: 'User successfully deleted.',
    };
  }
}
