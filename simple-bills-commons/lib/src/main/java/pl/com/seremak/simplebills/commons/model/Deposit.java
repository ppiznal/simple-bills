package pl.com.seremak.simplebills.commons.model;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
@Document
@NoArgsConstructor
public class Deposit extends Asset {

    public enum DepositType {
        PERPETUAL, TERM
    }

    @Builder
    public Deposit(final String username,
                   final String name,
                   final BigDecimal value,
                   final DepositType depositType,
                   final String bankName,
                   final Integer durationInMonths,
                   final BigDecimal annualInterestRate,
                   final Integer transactionNumber) {
        super(username, name, value);
        this.depositType = depositType;
        this.bankName = bankName;
        this.durationInMonths = durationInMonths;
        this.annualInterestRate = annualInterestRate;
        this.transactionNumber = transactionNumber;
    }

    private DepositType depositType;

    private String bankName;

    private Integer durationInMonths;

    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal annualInterestRate;

    private Integer transactionNumber;
}
