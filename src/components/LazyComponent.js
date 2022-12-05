import { Suspense } from "react";

const LazyComponent=(Comp) => {
    return(
        <Suspense fallback={<div>loading....</div>}>
            <Comp/>
        </Suspense>
    )
}
export default LazyComponent;