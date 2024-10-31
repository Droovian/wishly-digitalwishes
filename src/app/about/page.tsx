import VideoGroupMessage from "@/components/templates/video-group-carousel"

const videos = [
    {
        id: '1',
        video: 'https://cloud.appwrite.io/v1/storage/buckets/6715256f0020032941dd/files/67189bee0023019a2737/view?project=670f8c83000b3c68feee&project=670f8c83000b3c68feee&mode=admin',  // Path to your video in the public folder
        title: 'Sample Video'
    },
    {
        id: '2',
        video: 'https://cloud.appwrite.io/v1/storage/buckets/6715256f0020032941dd/files/67189bee0023019a2737/view?project=670f8c83000b3c68feee&project=670f8c83000b3c68feee&mode=admin',  // Path to your video in the public folder
        title: 'Sample'
    },
    {
        id: '3',
        video: 'https://cloud.appwrite.io/v1/storage/buckets/6715256f0020032941dd/files/67189bee0023019a2737/view?project=670f8c83000b3c68feee&project=670f8c83000b3c68feee&mode=admin',  // Path to your video in the public folder
        title: 'Sample'
    },
]

const details = {
    name:"Shivam",

}

export default function About(){
    return (
        <div className="flex justify-center h-screen">
            <VideoGroupMessage videos={videos} details={details} />
        </div>
    )
}