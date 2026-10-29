import type { ElementType, ReactNode } from 'react'

type Props = { as?: ElementType; className?: string; children: ReactNode }

export default function Container({ as: Tag = 'div', className = '', children }: Props) {
  return <Tag className={`mx-auto w-full max-w-content px-5 sm:px-8 ${className}`}>{children}</Tag>
}
