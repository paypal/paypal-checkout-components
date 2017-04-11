
export function parentTemplate({}) : string {

    return `

        <style>
            html, body {
                width: 100%;
                width: 100vw;
                min-width: 0;
                max-width: 100%;
                max-width: 100vw;

                height: 100%;
                height: 100vh;
                min-height: 0;
                max-height: 100%;
                max-height: 100vh;

                overflow: hidden
            }
        </style>

    `;
}
