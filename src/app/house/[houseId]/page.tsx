import React from 'react'


type Props = {
    params: {
        houseId: string
    }
}


export async function generateMetadata({ params }: Props) {
    const { houseId } = params;

    return {
        title: `HOUSE #${houseId}`,
        description: "",
    };
}


export default async function HousePage({ params }: Props) {
    const { houseId } = params;
    return (
        <div>하우스 :: {houseId}</div>
    );
}