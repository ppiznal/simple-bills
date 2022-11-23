package pl.com.seremak.simplebills.commons.converter;

import pl.com.seremak.simplebills.commons.model.Category;
import pl.com.seremak.simplebills.commons.model.CategoryUsageLimit;

import java.math.BigDecimal;
import java.time.Instant;

import static pl.com.seremak.simplebills.commons.utils.DateUtils.toYearMonthString;

public class CategoryUsageLimitConverter {

    public static CategoryUsageLimit categoryUsageLimitOf(final Category category, final Instant transactionYearMonth) {
        return CategoryUsageLimit.builder()
                .username(category.getUsername())
                .categoryName(category.getName())
                .limit(category.getLimit())
                .usage(BigDecimal.ZERO)
                .yearMonth(toYearMonthString(transactionYearMonth).orElseThrow())
                .build();
    }
}
