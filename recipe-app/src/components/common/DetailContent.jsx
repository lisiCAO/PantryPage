import React from 'react';
import TitleComponent from './../common/TitleComponent';
import AuthorInfoComponent from './../common/AuthorInfoComponent';
import UpdateTimeComponent from './../common/UpdateTimeComponent';
import ImageComponent from './../common/ImageComponent';
import InstructionComponent from './../common/InstructionComponent';
import DetailItemComponent from './../common/DetailItemComponent';
import { camelCaseToWords } from './../../assets/util/util'; 

const DetailContent = ({ data, config }) => {
    const renderMetadata = () => (
        <div className="detail-content__metadata">
            {config.createdBy && data[config.createdBy] && <AuthorInfoComponent author={data[config.createdBy]} />}
            {config.updatedAt && data[config.updatedAt] && <UpdateTimeComponent updateTime={data[config.updatedAt]} />}
        </div>
    );

    const renderDetail = (key, value) => {
        switch (key) {
            case config.title:
                return <TitleComponent key={key} value={value} />;
            case config.image:
                const imageUrl = value ? `http://localhost:8000${value}` : "http://localhost:8000/storage/img/default.png";
                return <ImageComponent key={key} src={imageUrl} alt={data[config.title] || "Default"} />;
            case config.instructions:
                return <InstructionComponent key={key} value={value} />;
            default:
                return <DetailItemComponent key={key} label={camelCaseToWords(key)} value={value} />;
        }
    };

    return (
        <div className="detail-content">
            {config.title && <TitleComponent key="title" value={data[config.title]} />}
            {renderMetadata()}
            {config.image && <ImageComponent key="image" src={`http://localhost:8000${data[config.image]}`} alt={data[config.title] || "Default"} />}
            {Object.entries(data).map(([key, value]) => {
                if (config.ignoreFields.includes(key) || key === config.title || key === config.image || key === config.updatedAt || key === config.createdBy ) return null;
                return renderDetail(key, value);
            })}
        </div>
    );
};

export default DetailContent;

