import { Fragment } from "react";
import TransactionRowSkeleton from "@/components/transactions/transaction-row/skeleton/TransactionRowSkeleton";
import Divider from "@/components/ui/divider/Divider";

interface TopMovementsSkeletonProps {
  rows: number;
}

export default function TopMovementsSkeleton({ rows }: TopMovementsSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <Fragment key={index}>
          {index > 0 ? <Divider /> : null}
          <TransactionRowSkeleton />
        </Fragment>
      ))}
    </>
  );
}
