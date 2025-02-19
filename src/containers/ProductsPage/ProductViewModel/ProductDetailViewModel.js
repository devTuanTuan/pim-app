/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from '../../../constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from '../../../components/Toast';
import { PIM_PRODUCT_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
class ProductDetailViewModel {
  productStore = null;
  formStatus = PAGE_STATUS.READY;
  productDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(productStore) {
    makeAutoObservable(this);
    this.productStore = productStore;
  }

  setForm = (productDetailViewModel) => {
    this.productDetailViewModel = productDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.productStore.getProductDetail(
      this.productDetailViewModel.formPropsData[PIM_PRODUCT_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetProductSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  create = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    return await this.productStore.create(
      this.productDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnCreateSuccessHandler
    );
  };

  update = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.productStore.update(
      this.productDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnCreateSuccessHandler = (result) => {
    if (result) {
      notify('Create successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Update successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetProductSuccessHandler = (result) => {
    if (result) {
      this.productDetailViewModel.formPropsData = {
        ...this.productDetailViewModel.formPropsData,
        ...Object.keys(PIM_PRODUCT_DETAIL_FIELD_KEY)
          .map((index) => {
            return {
              [PIM_PRODUCT_DETAIL_FIELD_KEY[index]]: result[PIM_PRODUCT_DETAIL_FIELD_KEY[index]],
            };
          })
          .reduce((prev, cur) => ({ ...prev, ...cur })),
      };
    }

    this.formStatus = PAGE_STATUS.READY;
  };

  handleFormPropsData = (key, value) => {
    if (key && value) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(this.productDetailViewModel.formPropsData[key], value);
      } else {
        this.productDetailViewModel.formPropsData[key] = value;
      }
    }
  };
}

export default ProductDetailViewModel;
