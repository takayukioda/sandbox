import { BadRequestException, Body, Controller, InternalServerErrorException, Get, Post } from '@nestjs/common';
import * as webPush from 'web-push';
import { AppService } from './app.service';

@Controller()
export class AppController {
  #vapidKeys: { publicKey: string; privateKey: string }
  constructor(private readonly appService: AppService) {
    this.#vapidKeys = {
      publicKey: 'BO3RaGZf5xBIxvn5ZyHtznkli42k2WMAAxCAo5nVifW4rQi9ReZSHhybw1v31KgklUP2SLSxcBKpucZ-t8YMJ9M',
      privateKey: 'yXrZUQ8dnestP2c_G5zJl3itF3LVuXsVX93aHB-MOeQ'
    }
    webPush.setVapidDetails(
      "mailto:takayukioda@users.noreply.github.com",
      this.#vapidKeys.publicKey,
      this.#vapidKeys.privateKey,
    );
  }

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('subscription')
  subscribe(@Body() body: { endpoint: string }) {
    if (!body || !body.endpoint) {
      throw new BadRequestException({
        id: 'no-endpoint',
        message: 'Subscription must have an endpoint.',
      });
    }
    return this.appService.saveSubscription(body).then((id) => ({
      data: {
        success: true,
        id,
      }
    })).catch((error) => {
      throw new InternalServerErrorException({
        error: {
          id: 'unable-to-save-subscription',
          message: 'The subscription was received but we were unable to save it to our database.',
        }
      })
    });
  }

  @Post('push-simple')
  async pushMessage(@Body() body: any) {
    console.log({ body });
    const { message } = body;
    const subscriptions = await this.appService.getSubscriptions();
    console.log({ subscriptions });
    try {
      await Promise.all(subscriptions.map((sub: any) => this.triggerPush(sub, message)));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
    return {
      data: {
        success: true,
      },
    };
  }

  private triggerPush(subscription: any, data: string | Buffer | null ) {
    return webPush.sendNotification(subscription, data).catch(async (error) => {
      if (error.statusCode === 404 || error.statusCode === 410) {
        console.log("Subscription has expired or is no longer valid:", error);
        await this.appService.deleteSubscription(subscription._id);
      } else {
        throw error;
      }
    });
  }
}
