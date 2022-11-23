package pl.com.seremak.simplebills.commons.converter;

import pl.com.seremak.simplebills.commons.dto.http.CategoryDto;
import pl.com.seremak.simplebills.commons.dto.queue.ActionType;
import pl.com.seremak.simplebills.commons.dto.queue.CategoryEventDto;
import pl.com.seremak.simplebills.commons.model.Category;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryConverter {

    public static Category toCategory(final String username,
                                      final CategoryDto categoryDto,
                                      final Category.Type type) {
        return Category.builder()
                .username(username)
                .type(type)
                .transactionType(toTransactionTypeEnum(categoryDto))
                .name(categoryDto.getName())
                .limit(categoryDto.getLimit())
                .build();
    }

    public static Category toCategory(final CategoryDto categoryDto,
                                      final Category.Type type) {
        return toCategory(categoryDto.getUsername(), categoryDto, type);
    }

    public static Category toCategory(final String username,
                                      final String categoryName,
                                      final Category.TransactionType transactionType) {
        return Category.builder()
                .username(username)
                .transactionType(transactionType)
                .name(categoryName)
                .type(Category.Type.STANDARD)
                .build();
    }

    public static Category toCategory(final String username, final CategoryDto categoryDto) {
        return toCategory(username, categoryDto.getName(), categoryDto);
    }

    public static Category toCategory(final String username,
                                      final String categoryName,
                                      final CategoryDto categoryDto) {
        return Category.builder()
                .username(username)
                .transactionType(toTransactionTypeEnum(categoryDto))
                .name(categoryName)
                .limit(categoryDto.getLimit())
                .build();
    }

    public static CategoryDto toCategoryDto(final Category category) {
        return CategoryDto.builder()
                .username(category.getUsername())
                .name(category.getName())
                .transactionType(category.getTransactionType().toString().toUpperCase())
                .limit(category.getLimit())
                .build();
    }

    public static CategoryDto toCategoryDto(final String username,
                                            final String categoryName,
                                            final Category.TransactionType transactionType) {
        return CategoryDto.builder()
                .username(username)
                .name(categoryName)
                .transactionType(transactionType.toString().toUpperCase())
                .build();
    }


    public static List<Category> toCategories(final String username,
                                              final List<String> categoryNames,
                                              final Category.TransactionType transactionType) {
        return categoryNames.stream()
                .map(categoryName -> toCategory(username, categoryName, transactionType))
                .collect(Collectors.toList());
    }

    public static Category.TransactionType toTransactionTypeEnum(final CategoryDto categoryDto) {
        return Category.TransactionType.valueOf(categoryDto.getTransactionType().toUpperCase());
    }

    public static CategoryEventDto toCategoryEventDto(final Category category, final ActionType actionType) {
        return CategoryEventDto.builder()
                .username(category.getUsername())
                .categoryName(category.getName())
                .transactionType(category.getTransactionType())
                .limit(category.getLimit())
                .usageOfLimit(category.getUsageOfLimit())
                .actionType(actionType)
                .build();
    }

    public static CategoryEventDto toCategoryDeletionEventDto(final Category category, final String replacementCategoryName) {
        return CategoryEventDto.builder()
                .username(category.getUsername())
                .categoryName(category.getName())
                .replacementCategoryName(replacementCategoryName)
                .transactionType(category.getTransactionType())
                .limit(category.getLimit())
                .usageOfLimit(category.getUsageOfLimit())
                .actionType(ActionType.DELETION)
                .build();
    }
}
