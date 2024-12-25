'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

interface AvatarProps {
    writer: string;
    createdAt: string;
}

const Avatar = ({ writer, createdAt }: AvatarProps) => {
    const { user } = useUser();
    if (!user) return null;

    return (
        <div className="flex items-center space-x-3 rounded-lg">
            <img
                className="rounded-full border-2 border-slate-600 hover:scale-105 transition-transform duration-100"
                src={user.imageUrl}
                alt="User Avatar"
                height={45}
                width={45}
            />
            <div>
                <div className="font-bold text-xl text-slate-50">{writer}</div>
                <div className="text-xs text-slate-400">{new Date(createdAt).toLocaleDateString()}</div>
            </div>
        </div>
    );
};

export default Avatar;
