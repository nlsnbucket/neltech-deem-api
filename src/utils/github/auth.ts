import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';
import { environment } from 'src/config/environment';
import { GithubAuthResponse } from 'src/domain/models';

export async function githubAuth(code: string): Promise<GithubAuthResponse> {
  const { data } = await axios.post<GithubAuthResponse>(
    'https://github.com/login/oauth/access_token',
    {
      code,
      grant_type: 'authorization_code',
      redirect_uri: environment.GITHUB_REDIRECT_URL,
      client_id: environment.GITHUB_CLIENT_ID,
      client_secret: environment.GITHUB_CLIENT_SECRET,
    },
    {
      headers: {
        Accept: 'application/json',
      },
    },
  );

  if ((data as any)?.error) {
    Logger.error((data as any)?.error);
    throw new HttpException(
      'failed to try to login with your account',
      HttpStatus.FORBIDDEN,
    );
  }

  return data;
}
