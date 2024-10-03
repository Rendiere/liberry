import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


async function main() {
    const unknownAlbum = await prisma.album.findFirst({
        where: { title: 'Unknown Album' }
    })
    // Create Artists
    const artist1 = await prisma.artist.upsert({
        where: { name: 'Unknown Artist' },
        update: {},
        create: { name: 'Unknown Artist' },
    })

    const artist2 = await prisma.artist.upsert({
        where: { name: 'Sample Artist' },
        update: {},
        create: { name: 'Sample Artist' },
    })

    // Create Albums
    const album1 = await prisma.album.upsert({
        where: { id: unknownAlbum?.id ?? -1 },
        update: {},
        create: {
            title: 'Unknown Album',
            artistId: artist1.id,
            releaseAt: new Date('2024-01-01'),
        },
    })

    const album2 = await prisma.album.upsert({
        where: { id: unknownAlbum?.id ?? -1 },
        update: {},
        create: {
            title: 'Sample Album',
            artistId: artist2.id,
            releaseAt: new Date('2023-01-01'),
        },
    })

    // Create Songs
    await prisma.song.createMany({
        data: [
            {
                title: 'These Are The Beats',
                artistId: artist1.id,
                albumId: album1.id,
                duration: 496, // 8 minutes 16 seconds
                year: 2024,
                filePath: '/path/to/these_are_the_beats.mp3',
            },
            {
                title: 'Give Your Love To Me',
                artistId: artist1.id,
                albumId: album1.id,
                duration: 452, // 7 minutes 32 seconds
                year: 2000,
                filePath: '/path/to/give_your_love_to_me.mp3',
            },
            {
                title: 'Sample Song',
                artistId: artist2.id,
                albumId: album2.id,
                duration: 240, // 4 minutes
                year: 2023,
                filePath: '/path/to/sample_song.mp3',
            },
            // Add more sample songs as needed
        ],
    })
}

main()
    .then(() => {
        console.log('Database has been seeded. 🌱')
    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
