package pl.com.seremak.simplebills.commons.converter;

import org.apache.commons.lang3.StringUtils;
import pl.com.seremak.simplebills.commons.dto.http.DepositDto;
import pl.com.seremak.simplebills.commons.dto.http.TransactionDto;
import pl.com.seremak.simplebills.commons.dto.queue.ActionType;
import pl.com.seremak.simplebills.commons.dto.queue.TransactionEventDto;
import pl.com.seremak.simplebills.commons.model.Category;
import pl.com.seremak.simplebills.commons.model.Deposit;
import pl.com.seremak.simplebills.commons.model.Transaction;
import pl.com.seremak.simplebills.commons.utils.DateUtils;

import java.math.BigDecimal;
import java.time.LocalDate;

import static pl.com.seremak.simplebills.commons.model.Transaction.Type.EXPENSE;
import static pl.com.seremak.simplebills.commons.model.Transaction.Type.valueOf;
import static pl.com.seremak.simplebills.commons.utils.DateUtils.toInstantUTC;

public class TransactionConverter {


    public static TransactionDto toTransactionDto(final DepositDto depositDto) {
        return TransactionDto.builder()
                .category(Category.Type.ASSET.toString().toLowerCase())
                .type(EXPENSE.toString())
                .amount(depositDto.getValue())
                .date(LocalDate.now())
                .description(prepareDescription(depositDto.getName(), depositDto.getBankName()))
                .build();
    }

    public static TransactionDto toTransactionDto(final Deposit deposit) {
        return TransactionDto.builder()
                .transactionNumber(deposit.getTransactionNumber())
                .category(Category.Type.ASSET.toString().toLowerCase())
                .type(EXPENSE.toString())
                .amount(deposit.getValue())
                .date(LocalDate.now())
                .description(prepareDescription(deposit.getName(), deposit.getBankName()))
                .build();
    }

    public static Transaction toTransaction(final String username, final TransactionDto transactionDto) {
        return toTransaction(username, transactionDto.getTransactionNumber(), transactionDto);
    }

    public static Transaction toTransaction(final String username,
                                            final Integer transactionNumber,
                                            final TransactionDto transactionDto) {
        final Transaction.TransactionBuilder transactionBuilder = Transaction.builder()
                .user(username)
                .type(valueOf(transactionDto.getType().toUpperCase()))
                .transactionNumber(transactionNumber)
                .description(transactionDto.getDescription())
                .amount(transactionDto.getAmount())
                .category(transactionDto.getCategory());
        toInstantUTC(transactionDto.getDate())
                .ifPresent(transactionBuilder::date);
        return transactionBuilder.build();
    }

    public static Transaction toNormalizedTransaction(final String username, final TransactionDto transactionDto) {
        final Transaction transaction = toTransaction(username, transactionDto.getTransactionNumber(), transactionDto);
        return normalizeTransactionAmount(transaction);
    }

    public static Transaction toNormalizedTransaction(final String username,
                                                      final Integer transactionNumber,
                                                      final TransactionDto transactionDto) {
        final Transaction transaction = toTransaction(username, transactionNumber, transactionDto);
        return normalizeTransactionAmount(transaction);
    }

    public static TransactionDto toTransactionDto(final Transaction transaction) {
        final TransactionDto.TransactionDtoBuilder transactionDtoBuilder = TransactionDto.builder()
                .type(transaction.getType().toString().toUpperCase())
                .transactionNumber(transaction.getTransactionNumber())
                .description(transaction.getDescription())
                .amount(transaction.getAmount())
                .category(transaction.getCategory());
        DateUtils.toLocalDate(transaction.getDate())
                .ifPresent(transactionDtoBuilder::date);
        return transactionDtoBuilder.build();
    }

    public static TransactionEventDto toTransactionDto(final Transaction transaction,
                                                       final ActionType actionType) {
        return toTransactionDto(transaction, actionType, transaction.getAmount());
    }

    public static TransactionEventDto toTransactionDto(final Transaction transaction,
                                                       final ActionType actionType,
                                                       final BigDecimal amountDiff) {
        return TransactionEventDto.builder()
                .username(transaction.getUser())
                .categoryName(transaction.getCategory())
                .type(actionType)
                .amount(amountDiff)
                .date(transaction.getDate())
                .transactionNumber(transaction.getTransactionNumber())
                .build();
    }

    public static Transaction normalizeTransactionAmount(final Transaction transaction) {
        transaction.setAmount(normalizeAmount(transaction.getAmount(), transaction.getType()));
        return transaction;
    }

    public static BigDecimal normalizeAmount(final BigDecimal amount, final Transaction.Type transactionType) {
        return EXPENSE.equals(transactionType) ?
                amount.abs().negate() : amount.abs();
    }

    public static BigDecimal normalizeAmount(final BigDecimal amount, final String transactionTypeStr) {
        final Transaction.Type transactionType = valueOf(transactionTypeStr);
        return normalizeAmount(amount, transactionType);
    }

    public static String prepareDescription(final String depositName, final String bankName) {
        final String description = StringUtils.isBlank(bankName) ?
                "%s".formatted(depositName) :
                "%s in %s".formatted(depositName, bankName);
        return description.substring(0, 1).toUpperCase() + description.substring(1);
    }
}
