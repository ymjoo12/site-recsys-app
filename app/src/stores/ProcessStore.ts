import { observable, action } from 'mobx';
import { Request } from '~/utils';
import axios from 'axios';

export type TVideo = {
    uri: string;
    name: string;
    type: string;
};

export type TStatus = 'ready' | 'uploaded' | 'processing' | 'done' | 'error';

export type TResult = {
    video_id: number;
    prediction?: number;
    revisitation?: number;
    loudness?: number;
    video_data?: any;
    status: TStatus;
};

export const ProcessStore = observable({
    results: [] as TResult[],
    data: {
        video: {
            uri: '',
            name: '',
            type: ''
        } as TVideo,
        revisitation: 0,
        loudness: 0,
    },

    resetData: action(() => {
        ProcessStore.data = {
            video: {
                uri: '',
                name: '',
                type: ''
            },
            revisitation: 0,
            loudness: 0,
        }
    }),

    setVideo: action((video: TVideo) => {
        console.log('set video', video);
        ProcessStore.data.video = video;
    }),
    setRevisitation: action((revisitation: number) => {
        ProcessStore.data.revisitation = revisitation;
    }),
    setLoudness: action((loudness: number) => {
        ProcessStore.data.loudness = loudness;
    }),

    upload: action(async () => {
        console.log('uploading...');

        let results = ProcessStore.results;
        results.push({ video_id: -1, status: 'ready' });
        ProcessStore.results = results;
        const index = ProcessStore.results.length - 1;

        const formData = new FormData();
        formData.append("video", ProcessStore.data.video);
        formData.append("revisitation", ProcessStore.data.revisitation);
        formData.append("loudness", ProcessStore.data.loudness);
        const res = (await Request.post('/upload/video', formData));
        const video_id = res.video_id;

        ProcessStore.results[index] = { video_id, status: 'uploaded' };

        console.log('uploaded');
        return video_id;
    }),

    process: action(async (index: number) => {
        console.log('processing:', index);

        const video_id = ProcessStore.results[index].video_id;
        ProcessStore.results[index].status = 'processing';
        const res = (await Request.post('/process/video', { video_id }));
        let result = ProcessStore.results[index];
        result = { ...res, status: 'done' };
        ProcessStore.results[index] = result;

        console.log('processed');
    }),
});

