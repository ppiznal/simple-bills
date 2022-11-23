package pl.com.seremak.simplebills.commons.utils;

import pl.com.seremak.simplebills.commons.dto.queue.ActionType;
import pl.com.seremak.simplebills.commons.dto.queue.TransactionEventDto;

import java.math.BigDecimal;

public class TransactionBalanceUtils {

    public static BigDecimal updateBalance(final BigDecimal currentBalance, final TransactionEventDto transactionEventDto) {
        return calculateBalanceAfterTransaction(currentBalance, transactionEventDto.getAmount(), transactionEventDto.getType());
    }

    public static BigDecimal updateCategoryUsage(final BigDecimal currentBalance, final TransactionEventDto transactionEventDto) {
        return calculateBalanceAfterTransaction(currentBalance, transactionEventDto.getAmount().negate(), transactionEventDto.getType());
    }

    private static BigDecimal calculateBalanceAfterTransaction(final BigDecimal currentBalance,
                                                               final BigDecimal transactionAmount,
                                                               final ActionType type) {
        return switch (type) {
            case CREATION, UPDATE -> currentBalance.add(transactionAmount);
            case DELETION -> currentBalance.subtract(transactionAmount);
        };
    }
}
