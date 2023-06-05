import app, {init} from '@/app';

const port: number = parseInt(process.env.PORT ?? '4000');
console.log(port)

init().then(() => {
    app.listen(port, () => {
        console.log(`Server is listen on port ${port}.`);
    });
});