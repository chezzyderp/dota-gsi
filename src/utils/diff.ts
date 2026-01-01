export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object
    ? DeepPartial<T[K]>
    : T[K]
}


const diffObjectsList = []

export function diffObjects<T extends Record<string, any>>(
    previous: T,
    current: T
): DeepPartial<T> | undefined {

    const result: Partial<Record<keyof T, unknown>> = {}

    for (const key of Object.keys(previous) as Array<keyof T>) {
        const prevValue = previous[key]
        const currValue = current[key]

        if (
            prevValue !== null &&
            currValue !== null &&
            typeof prevValue === 'object' &&
            typeof currValue === 'object' &&
            !Array.isArray(prevValue)
        ) {
            const nestedDiff = diffObjects(
                prevValue as Record<string, any>,
                currValue as Record<string, any>
            )

            if (nestedDiff) {
                result[key] = nestedDiff
            }
            continue
        }


        if (prevValue !== currValue) {
            result[key] = currValue
        }
    }

    return Object.keys(result).length > 0
        ? (result as DeepPartial<T>)
        : undefined
}
