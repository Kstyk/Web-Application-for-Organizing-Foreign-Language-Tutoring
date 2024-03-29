from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination


class ClassPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    page_query_param = 'page'
    max_page_size = 100


class AskClassesPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    page_query_param = 'page'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'num_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data,
        })


class PurchaseHistoryPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    page_query_param = 'page'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'num_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data,
        })


class OpinionPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    page_query_param = 'page'
    max_page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'num_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'results': data,
        })
