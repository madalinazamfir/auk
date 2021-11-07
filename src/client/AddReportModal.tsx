import React, { useLayoutEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import {Modal, Input, Select, message} from 'antd';
import useApi from './useApi';

const { Option } = Select;
const { TextArea } = Input;

const REPORT_TYPES = {
    BEAR: 'BEAR',
    ATTACK: 'ATTACK',
};

const AddReportModal = ({isVisible, marker, onCancel, onAdded}) => {
    const [reportInfo, setReportInfo] = useState({
        reportType: REPORT_TYPES.BEAR,
        reportDescription: ''
    });
    const [isCreatingReport, setIsCreatingReport] = useState(false);
    const {saveBearAlert} = useApi();

    // handler for alert added
    const onAddAlert = async () => {
        setIsCreatingReport(true);

        // set the popup text
        const popup = new mapboxgl.Popup({ offset: 25, className: 'report-popup' }).setHTML(
            `
                <h4>${reportInfo.reportType === REPORT_TYPES.BEAR ? 'Bear sighting' : 'Bear attack'}</h4>
                <p>${reportInfo.reportDescription}</p>
            `
        );
        marker.setPopup(popup);

        const longLat = marker.getLngLat();

        await saveBearAlert({
            contact: reportInfo.reportDescription,
            type: reportInfo.reportType,
            latitude: longLat.lat,
            longitude: longLat.lng
        });

        setIsCreatingReport(false);
        onAdded();

        message.success('Alert added');

        // reset modal form data
        setReportInfo({
            reportType: REPORT_TYPES.BEAR,
            reportDescription: ''
        });
    }

    // handler for cancel add alert
    const onCancelAddAlert = () => {
        // remove the temporary marker
        marker.remove();

        onCancel();

        setReportInfo({
            reportType: REPORT_TYPES.BEAR,
            reportDescription: ''
        });
    };

    const onTextAreaChange = (e) => {
        setReportInfo({...reportInfo, reportDescription: e.target.value});
    }

    const onSelectChange = (selectedValue) => {
        marker.getElement().classList.replace(
            selectedValue === REPORT_TYPES.BEAR ? 'bear-attack' : 'bear-sighting',
            selectedValue === REPORT_TYPES.BEAR ? 'bear-sighting' : 'bear-attack'
        );

        setReportInfo({...reportInfo, reportType: selectedValue})
    }

    return (
        <Modal
            closable={false}
            title="Add new report"
            visible={isVisible}
            confirmLoading={isCreatingReport}
            okText="Add"
            onOk={onAddAlert}
            onCancel={onCancelAddAlert}
        >
            <Select onSelect={onSelectChange} value={reportInfo.reportType} style={{marginBottom: 15}}>
                <Option value={REPORT_TYPES.BEAR}>Bear sighting</Option>
                <Option value={REPORT_TYPES.ATTACK}>Bear attack</Option>
            </Select>

            <TextArea value={reportInfo.reportDescription} rows={4} onChange={onTextAreaChange} />
        </Modal>
    );
};

export default AddReportModal;