import axios from 'axios';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GithubUserResponse } from 'src/domain/models';

export async function githubGetUser(
  access_token: string,
): Promise<GithubUserResponse> {
  const { data } = await axios.get<GithubUserResponse>(
    'https://api.github.com/user',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  if ((data as any)?.error) {
    Logger.error((data as any)?.error);
    throw new HttpException('failed to get user', HttpStatus.BAD_REQUEST);
  }

  return data;
}
