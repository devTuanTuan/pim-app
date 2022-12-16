/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import AesirxPimProductPricesApiService from 'library/Pim/PimProductPrices/PimProductPrices';
import AesirxPimUtilApiService from 'library/Pim/PimUtils/PimUtils';
import { runInAction } from 'mobx';

export default class ProductPricesStore {
  async getList(callbackOnSuccess, callbackOnError, filters) {
    try {
      const getListAPIService = new AesirxPimProductPricesApiService();
      const respondedData = await getListAPIService.getList(filters);
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async getListPublishStatus(callbackOnSuccess, callbackOnError) {
    try {
      const getAesirxPimUtilApiService = new AesirxPimUtilApiService();
      const respondedData = await getAesirxPimUtilApiService.getListPublishStatus();
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async updateStatus(arr, status) {
    try {
      const getUpdateStatusApiService = new AesirxPimProductPricesApiService();
      const respondedData = await getUpdateStatusApiService.updateStatus(arr, status);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }

  async updatePrices(listPrices) {
    try {
      const getUpdatePricesApiService = new AesirxPimProductPricesApiService();
      const respondedData = await getUpdatePricesApiService.updatePrices(listPrices);
      return respondedData;
    } catch (error) {
      // no error throw
    }

    return false;
  }


}
