import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { PIM_FIELD_GROUP_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';
import Spinner from 'components/Spinner';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import { withFieldGroupViewModel } from 'containers/FieldsGroupPage/FieldGroupViewModel/FieldGroupViewModelContextProvider';
import UtilsStore from 'store/UtilsStore/UtilsStore';
import UtilsViewModel from 'store/UtilsStore/UtilsViewModel';

const utilsStore = new UtilsStore();
const utilsViewModel = new UtilsViewModel(utilsStore);

const FieldGroupInformation = observer(
  class FieldGroupInformation extends Component {
    constructor(props) {
      super(props);
      this.utilsListViewModel = utilsViewModel.utilsListViewModel;
      this.fieldGroupDetailViewModel = this.props.viewModel.fieldGroupDetailViewModel;
    }

    componentDidMount() {
      this.utilsListViewModel.getListContentType();
    }

    render() {
      const { t, validator } = this.props;
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'txt_alias',
              key: PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ALIAS,
              type: FORM_FIELD_TYPE.INPUT,
              getValueSelected:
                this.fieldGroupDetailViewModel.fieldGroupDetailViewModel.formPropsData[
                  PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ALIAS
                ],
              placeholder: t('txt_type'),
              handleChange: (data) => {
                this.fieldGroupDetailViewModel.handleFormPropsData(
                  PIM_FIELD_GROUP_DETAIL_FIELD_KEY.ALIAS,
                  data.target.value
                );
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_section',
              key: PIM_FIELD_GROUP_DETAIL_FIELD_KEY.SECTION,
              type: FORM_FIELD_TYPE.SELECTION,
              getValueSelected: this.fieldGroupDetailViewModel.fieldGroupDetailViewModel
                .formPropsData[PIM_FIELD_GROUP_DETAIL_FIELD_KEY.SECTION]?.length
                ? {
                    label: this.utilsListViewModel.listContentType?.find(
                      (x) =>
                        x.value ===
                        this.fieldGroupDetailViewModel.fieldGroupDetailViewModel.formPropsData[
                          PIM_FIELD_GROUP_DETAIL_FIELD_KEY.SECTION
                        ][0]
                    )?.label,
                    value:
                      this.fieldGroupDetailViewModel.fieldGroupDetailViewModel.formPropsData[
                        PIM_FIELD_GROUP_DETAIL_FIELD_KEY.SECTION
                      ][0],
                  }
                : null,
              getDataSelectOptions: this.utilsListViewModel.listContentType.length
                ? this.utilsListViewModel.listContentType.map((item) => {
                    return {
                      label: item.label,
                      value: item.value,
                    };
                  })
                : null,
              handleChange: (data) => {
                this.fieldGroupDetailViewModel.handleFormPropsData(
                  PIM_FIELD_GROUP_DETAIL_FIELD_KEY.SECTION,
                  [data.value]
                );
              },
              className: 'col-lg-12',
            },
            {
              label: 'txt_description',
              key: PIM_FIELD_GROUP_DETAIL_FIELD_KEY.DESCRIPTION,
              type: FORM_FIELD_TYPE.EDITOR,
              getValueSelected:
                this.fieldGroupDetailViewModel.fieldGroupDetailViewModel.formPropsData[
                  PIM_FIELD_GROUP_DETAIL_FIELD_KEY.DESCRIPTION
                ] ?? null,
              handleChange: (data) => {
                this.fieldGroupDetailViewModel.handleFormPropsData(
                  PIM_FIELD_GROUP_DETAIL_FIELD_KEY.DESCRIPTION,
                  data
                );
              },
              className: 'col-lg-12',
            },
          ],
        },
      ];
      return (
        <div className="p-24 bg-white rounded-1 shadow-sm h-100 mt-24">
          {this.utilsListViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          {Object.keys(generateFormSetting)
            .map((groupIndex) => {
              return [...Array(generateFormSetting[groupIndex])].map((group) => {
                return renderingGroupFieldHandler(group, validator);
              });
            })
            .reduce((arr, el) => {
              return arr.concat(el);
            }, [])}
        </div>
      );
    }
  }
);
export default withTranslation('common')(withFieldGroupViewModel(FieldGroupInformation));
