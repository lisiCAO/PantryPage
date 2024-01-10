import React from 'react';
import TitleComponent from './../common/TitleComponent';
import AuthorInfoComponent from './../common/AuthorInfoComponent';
import UpdateTimeComponent from './../common/UpdateTimeComponent';
import ImageComponent from './../common/ImageComponent';
import InstructionComponent from './../common/InstructionComponent';
import DetailItemComponent from './../common/DetailItemComponent';
import { camelCaseToWords } from './../../assets/util/util'; 

const DetailContent = ({ data, config }) => {
    const renderDetail = (key, value) => {
        switch (key) {
            case config.title:
                return <TitleComponent key={key} value={value} />;
            case config.createdBy:
                return <AuthorInfoComponent key={key} author={value} />;
            case config.updatedAt:
                return <UpdateTimeComponent key={key} updateTime={value} />;
            case config.image:
                const imageUrl = value ? `http://localhost:8000${value}` : "http://localhost:8000/storage/img/default.png";
                return <ImageComponent key={key} src={imageUrl} alt={data[config.title] || "Default"} />;
            case config.instructions:
                return <InstructionComponent key={key} value={value} />;
            default:
                return (
                    <DetailItemComponent key={key} label={camelCaseToWords(key)} value={value} />
                );
        }
    };

    return (
        <div className="detail-content">
            {Object.entries(data).map(([key, value]) => {
                if (config.ignoreFields.includes(key)) return null;
                return renderDetail(key, value);
            })}
        </div>
    );
};

export default DetailContent;

