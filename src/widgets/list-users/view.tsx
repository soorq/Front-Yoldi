'use client';

import { Avatar, AvatarFallback, AvatarImage } from '~&/src/shared/ui/avatar';
import type { IUser } from '~&/src/shared/types/User.interface';
import { Skeleton } from '~&/src/shared/ui/skeleton';
import { cn } from '~&/src/shared/lib/utils';
import React from 'react';

const widthSkeleton = ['w-1/6', 'w-2/6', 'w-1/5', 'w-2/12', 'w-1/4', 'w-1/5'];

export function ListUsers({
    data,
    isLoading
}: {
    data: IUser[] | null;
    isLoading: boolean;
}) {
    const memoizedData = React.useMemo(() => {
        return data
            ? data.map((user, i) => (
                  <li
                      key={user.slug}
                      className={cn(
                          'py-2.5',
                          i === 0 ? 'border-t border-input' : ''
                      )}
                  >
                      <a
                          href={`/account/${user.slug}`}
                          className="flex justify-between items-center gap-5"
                      >
                          <Avatar className="max-h-[50px] max-w-[50px] h-auto w-full aspect-square border border-input">
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                              <AvatarImage
                                  src={user.image ? user.image.url : ''}
                                  alt={`User ${user.image?.id}`}
                                  loading="lazy"
                              />
                          </Avatar>
                          <div className="flex md:items-center md:justify-between w-full md:gap-5 flex-col items-start md:flex-row">
                              <p className="text-base leading-[160%]">
                                  {user.name}
                              </p>
                              <p className="text-muted-foreground text-base leading-[160%]">
                                  {user.email}
                              </p>
                          </div>
                      </a>
                  </li>
              ))
            : null;
    }, [data]);

    return (
        <section className="max-w-[860px] w-full md:px-[30px] px-[20px] h-full mx-auto my-[50px]">
            <h1 className="text-[30px] mb-[32px] leading-[42px] font-medium tracking-wide">
                Список аккаунтов
            </h1>

            {isLoading ? (
                <div className="flex flex-col w-full h-full overflow-y-auto gap-5 max-h-[500px] pt-2.5">
                    {Array(7)
                        .fill(0)
                        .map((_, i) => (
                            <div
                                className="flex gap-5"
                                key={`skeleton-group-${i}`}
                            >
                                <Skeleton
                                    className="max-w-[50px] w-full h-auto aspect-square bg-primary rounded-full"
                                    key={`skeleton-avatar-${i}`}
                                />
                                <div className="w-full flex flex-col md:flex-row justify-between items-start h-auto md:items-center">
                                    <Skeleton
                                        className={cn(
                                            `${widthSkeleton[Math.floor(Math.random() * 4)]} bg-primary h-5`
                                        )}
                                        key={`skeleton-name-${i}-1`}
                                    />
                                    <Skeleton
                                        className={cn(
                                            `${widthSkeleton[Math.floor(Math.random() * 4)]} bg-primary h-5`
                                        )}
                                        key={`skeleton-email-${i}-2`}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            ) : (
                data && (
                    <ul className="divide-y divide-input max-h-[500px] h-full overflow-y-auto">
                        {memoizedData}
                    </ul>
                )
            )}
        </section>
    );
}
